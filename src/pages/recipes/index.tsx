import type { GetServerSideProps, NextPage } from "next";
import { JsonWebTokenJwtService } from "../../server/modules/auth/infrastructure/services/jsonwebtoken-jwt-service";
import { prisma } from "../../server/db/client";
import Head from "next/head";
import { useContext } from "react";
import { UserContext } from "../../modules/auth/presentation/contexts/user-context/user-context";
import { Button } from "@chakra-ui/react";
import { useRouter } from "next/router";

type RecipeListPageProps = {
  recipes: {
    id: string;
    name: string;
    userId: string;
    createdAt: string;
    updatedAt: string;
  }[];
};

export const getServerSideProps: GetServerSideProps<
  RecipeListPageProps
> = async ({ req }) => {
  const token = req.cookies.token || "";
  const jwtService = new JsonWebTokenJwtService();

  const user = jwtService.verify(token);
  if (!user) {
    return {
      redirect: {
        destination: "/auth/login",
        permanent: false,
      },
    };
  }

  const recipes = await prisma.recipe.findMany({ where: { userId: user.id } });
  const parsedRecipes = recipes.map((recipe) => ({
    ...recipe,
    createdAt: recipe.createdAt.toISOString(),
    updatedAt: recipe.updatedAt.toISOString(),
  }));

  return {
    props: {
      recipes: parsedRecipes,
    },
  };
};

const RecipeListPage: NextPage<RecipeListPageProps> = ({ recipes }) => {
  const router = useRouter();
  const user = useContext(UserContext);

  return (
    <>
      <Head>
        <title>Recipes</title>
      </Head>

      <h1>Recipe List Page</h1>

      <Button onClick={() => router.push("/recipes/add")}>
        Add new recipe
      </Button>

      <p>{JSON.stringify(user, null, 2)}</p>

      {recipes.map((recipe) => (
        <div key={recipe.id}>
          <h2>{recipe.name}</h2>
          <p>{recipe.createdAt}</p>
        </div>
      ))}
    </>
  );
};

export default RecipeListPage;

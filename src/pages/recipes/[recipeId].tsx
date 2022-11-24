import type { NextPage } from "next";
import { useRouter } from "next/router";
import { GridLoader } from "react-spinners";
import { FullPageLoader } from "../../modules/shared/presentation/components/FullPageLoader/FullPageLoader";
import { ReadonlyFlow } from "../../modules/recipes/presentation/components/flows/ReadonlyFlow/ReadonlyFlow";
import { useRecipePage } from "../../modules/recipes/presentation/hooks/useRecipePage/useRecipePage";
import { nodeTypes } from "../../modules/recipes/presentation/components/nodes/node-types";

const RecipePage: NextPage = () => {
  const router = useRouter();
  const { recipeId } = router.query;
  const { isLoading, nodes, edges } = useRecipePage({
    recipeId: recipeId as string | undefined,
  });

  if (isLoading) {
    return (
      <FullPageLoader>
        <GridLoader />
      </FullPageLoader>
    );
  }

  return <ReadonlyFlow nodes={nodes} edges={edges} nodeTypes={nodeTypes} />;
};

export default RecipePage;

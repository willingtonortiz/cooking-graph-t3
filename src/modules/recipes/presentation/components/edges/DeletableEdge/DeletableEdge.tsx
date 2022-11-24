import type { FC } from "react";
import type { DeletableEdgeProps } from "./DeletableEdge.types";
import { getSmoothStepPath } from "reactflow";
import { IconButton } from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";

const foreignObjectSize = 40;

export const DeletableEdge: FC<DeletableEdgeProps> = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  markerEnd,
  style = {},
  data,
}) => {
  const [edgePath, labelX, labelY] = getSmoothStepPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  return (
    <>
      <path
        id={id}
        style={style}
        className="react-flow__edge-path"
        d={edgePath}
        markerEnd={markerEnd}
      />

      <foreignObject
        width={foreignObjectSize}
        height={foreignObjectSize}
        x={labelX - foreignObjectSize / 2}
        y={labelY - foreignObjectSize / 2}
        className="edgebutton-foreignobject"
        requiredExtensions="http://www.w3.org/1999/xhtml"
      >
        <IconButton
          colorScheme={"red"}
          aria-label="Delete"
          className="edgebutton"
          rounded={"full"}
          onClick={() => data?.onRemove(id)}
          icon={<DeleteIcon />}
        />
      </foreignObject>
    </>
  );
};

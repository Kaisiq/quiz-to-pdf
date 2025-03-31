import type React from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import type { GradingScale } from "~/lib/types";

interface GradingScaleInputProps {
  gradingScale: GradingScale;
  setGradingScale: React.Dispatch<GradingScale>;
}

const GradingScaleInput: React.FC<GradingScaleInputProps> = ({
  gradingScale,
  setGradingScale,
}) => {
  const handleScoreChange = (
    index: number,
    field: "minScore" | "maxScore",
    value: string,
  ) => {
    const newGradingScale = [...gradingScale];
    if (newGradingScale?.[index]?.[field] !== undefined) {
      newGradingScale[index][field] = Number.parseInt(value);
    }
    setGradingScale(newGradingScale);
  };

  const handleGradeChange = (index: number, value: string) => {
    const newGradingScale = [...gradingScale];

    if (newGradingScale?.[index]?.grade !== undefined) {
      newGradingScale[index].grade = value;
    }
    setGradingScale(newGradingScale);
  };

  const addGradeRow = () => {
    setGradingScale([...gradingScale, { minScore: 0, maxScore: 0, grade: "" }]);
  };

  return (
    <div className="md:mx-[10%] xl:mx-[25%]">
      <h2 className="mb-2 text-lg font-semibold">Grading Scale</h2>
      <div className="overflow-x-scroll rounded-md">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Score Range
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Grade
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {gradingScale.map((grade, index) => (
              <tr key={index}>
                <td className="whitespace-nowrap px-6 py-4">
                  <div className="flex items-center gap-2">
                    <Input
                      type="number"
                      placeholder="Min"
                      value={grade.minScore}
                      onChange={(e) =>
                        handleScoreChange(index, "minScore", e.target.value)
                      }
                      className="w-20"
                    />
                    -
                    <Input
                      type="number"
                      placeholder="Max"
                      value={grade.maxScore}
                      onChange={(e) =>
                        handleScoreChange(index, "maxScore", e.target.value)
                      }
                      className="w-20"
                    />
                  </div>
                </td>
                <td className="whitespace-nowrap px-6 py-4">
                  <Input
                    type="text"
                    placeholder="Grade (e.g., A, 5)"
                    value={grade.grade}
                    onChange={(e) => handleGradeChange(index, e.target.value)}
                    className="w-32"
                  />
                </td>
              </tr>
            ))}
            <tr>
              <td colSpan={2} className="px-6 py-4">
                <Button
                  className="m-auto flex"
                  type="button"
                  variant="outline"
                  onClick={addGradeRow}
                >
                  Add Grade
                </Button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default GradingScaleInput;

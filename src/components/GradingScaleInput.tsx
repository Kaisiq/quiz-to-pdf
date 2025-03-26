import type React from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { GradingScale } from "~/types/gradingScale";

interface GradingScaleInputProps {
  gradingScale: { minScore: number; maxScore: number; grade: string }[];
  setGradingScale: React.Dispatch<
    React.SetStateAction<
      { minScore: number; maxScore: number; grade: string }[]
    >
  >;
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
    const newGradingScale = [...gradingScale] as GradingScale;
    if (newGradingScale?.[index]?.[field]) {
      newGradingScale[index][field] = Number(value);
      setGradingScale(newGradingScale);
    }
  };

  const handleGradeChange = (index: number, value: string) => {
    const newGradingScale = [...gradingScale] as GradingScale;

    newGradingScale[index].grade = value;
    setGradingScale(newGradingScale);
  };

  const addGradeRow = () => {
    setGradingScale([...gradingScale, { minScore: 0, maxScore: 0, grade: "" }]);
  };

  return (
    <div className="mx-[25%]">
      <h2 className="mb-2 text-lg font-semibold">Grading Scale</h2>
      <div className="overflow-x-auto">
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
                    className="w-24"
                  />
                </td>
              </tr>
            ))}
            <tr>
              <td colSpan={2} className="px-6 py-4">
                <Button type="button" variant="outline" onClick={addGradeRow}>
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

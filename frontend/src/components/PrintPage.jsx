import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { usePrintContext } from "../context/PrintContext";

const PrintPage = () => {
  const { toast } = useToast();
  const { uploadedFile, isVerified } = usePrintContext();
  const [prints, setPrints] = useState(1);
  const [copies, setCopies] = useState(1);

  if (!isVerified) {
    return <div>Access denied. Please verify your secure code.</div>;
  }

  const handlePrint = () => {
    // Simulating print action
    toast({
      title: "Success",
      description: `Printing ${prints} print(s) with ${copies} copy(ies) each.`,
    });
  };

  return (
    <Card className="w-full max-w-md mx-auto mt-10">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">
          Print Options
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <label
              htmlFor="prints"
              className="block text-sm font-medium text-gray-700"
            >
              Number of Prints
            </label>
            <Input
              id="prints"
              type="number"
              min="1"
              value={prints}
              onChange={(e) => setPrints(e.target.value)}
            />
          </div>
          <div>
            <label
              htmlFor="copies"
              className="block text-sm font-medium text-gray-700"
            >
              Number of Copies
            </label>
            <Input
              id="copies"
              type="number"
              min="1"
              value={copies}
              onChange={(e) => setCopies(e.target.value)}
            />
          </div>
          <Button onClick={handlePrint} className="w-full">
            Print
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default PrintPage;

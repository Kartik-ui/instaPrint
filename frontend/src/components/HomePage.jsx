import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { usePrintContext } from "../context/PrintContext";

const HomePage = () => {
  const { toast } = useToast();
  const { setUploadedFile, setUniqueLink } = usePrintContext();
  const [file, setFile] = useState(null);
  const [fakeUniqueLink, setFakeUniqueLink] = useState(null); // Added state for fakeUniqueLink

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      toast({
        title: "Error",
        description: "Please select a file to upload.",
        variant: "destructive",
      });
      return;
    }

    // Simulating file upload and getting a unique link
    const newFakeUniqueLink = `https://cloudprint.com/${Math.random()
      .toString(36)
      .substr(2, 9)}`;
    setUploadedFile(file);
    setUniqueLink(newFakeUniqueLink);
    setFakeUniqueLink(newFakeUniqueLink); // Update the state variable

    toast({
      title: "Success",
      description: "File uploaded successfully!",
    });
  };

  const handleCopyLink = () => {
    if (fakeUniqueLink) {
      // Added condition to check if fakeUniqueLink exists
      navigator.clipboard.writeText(fakeUniqueLink);
      toast({
        title: "Copied",
        description: "Link copied to clipboard!",
      });
    } else {
      toast({
        title: "Error",
        description: "No link to copy yet!",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto mt-10">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">
          Cloud Printing Service
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Input type="file" onChange={handleFileChange} />
          <Button onClick={handleUpload} className="w-full">
            Upload File
          </Button>
          {fakeUniqueLink && (
            <div className="mt-4">
              <p className="mb-2">Your unique link:</p>
              <div className="flex items-center space-x-2">
                <Input value={fakeUniqueLink} readOnly />
                <Button onClick={handleCopyLink}>Copy</Button>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default HomePage;

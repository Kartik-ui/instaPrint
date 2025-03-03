import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { API_URL } from "@/config/config";
import { useToast } from "@/hooks/use-toast";
import { usePrintContext } from "../context/PrintContext";

const HomePage = () => {
  const { toast } = useToast();
  const { uploadedFile, setUploadedFile, uniqueLink, setUniqueLink } =
    usePrintContext();

  const handleFileChange = (e) => {
    setUploadedFile(e.target.files[0]);
  };

  console.log(uploadedFile);

  const handleUpload = async () => {
    try {
      if (!uploadedFile) {
        toast({
          title: "Error",
          description: "Please select a file to upload.",
          variant: "destructive",
        });
        return;
      }
      let formData = new FormData();
      formData.append("file", uploadedFile);
      let response = await fetch(`${API_URL}/upload`, {
        method: "POST",
        body: formData,
      });
      response = await response.json();
      console.log("response", response);
      const link = `http://localhost:5173/access/${response.data.uniqueId}`;
      toast({
        title: "Success",
        description: response.message,
      });
      setUniqueLink(link);
    } catch (error) {
      toast({
        title: "Error",
        description: error.data.message || error.message,
        variant: "destructive",
      });
    }
  };

  const handleCopyLink = () => {
    if (uniqueLink) {
      navigator.clipboard.writeText(uniqueLink);
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
          <Input type="file" multiple onChange={handleFileChange} />
          {/* <ul>
            {uploadedFile?.map((item, index) => (
              <li key={index}>{item.name}</li>
            ))}
          </ul> */}
          <Button onClick={handleUpload} className="w-full">
            Upload File
          </Button>
          {uniqueLink && (
            <div className="mt-4">
              <p className="mb-2">Your unique link:</p>
              <div className="flex items-center space-x-2">
                <Input value={uniqueLink} readOnly />
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

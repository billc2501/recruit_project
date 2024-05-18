import UploadDoc from "@/components/ui/UploadDoc";

async function getApplications(){
  const res = await fetch(`${process.env.BASE_URL}/api/application`, { cache: 'no-store' })
  if (!res.ok){
    throw new Error(`HTTP error! status: ${res.status} to ${process.env.BASE_URL}/api/getApplications`);
  }
  console.log("supp", res.ok);
  const responseData = await res.json();
  console.log("add", responseData);
  return responseData.data;
}

export default async function Home() {
  const data: {id: number; position: string, status: string, candidate_id: number}[] = await getApplications();
  return (
    <div>
      <UploadDoc/>
      <span>footer</span>
    </div>
  );
}

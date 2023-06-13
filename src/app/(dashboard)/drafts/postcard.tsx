"use client";

import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
} from "@material-tailwind/react";
import { useRouter } from "next/navigation";


export default function PostCard({ id  }: { id: number}) {

    const router = useRouter();
  return (
    <Card className="mt-6 ">
      <CardHeader color="blue-gray" className="relative ">
        <img
          src="https://images.unsplash.com/photo-1540553016722-983e48a2cd10?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"
          alt="img-blur-shadow"
        />
      </CardHeader>
      <CardBody>
        <Typography>
          The place is close to Barceloneta Beach and bus stop just 2 min by
          walk and near to &quot;Naviglio&quot; where you can enjoy the main
          night life in Barcelona.
        </Typography>
      </CardBody>
      <CardFooter className="pt-0">
        <button className="btn btn-primary text-white"
        
        onClick={() => {
            router.push("/post/1");
        }}
        >Edit</button>
      </CardFooter>
    </Card>
  );
}

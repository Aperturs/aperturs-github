'use client'

import {
    Card,
    CardHeader,
    CardBody,
    Typography,
    Button,
    CardFooter,
  } from "@material-tailwind/react";


type Props = {
    repoName: string,
    repoDescription: string,
    lastUpdated: string,
    repoImage: string
}   
 
export default function GithubCard({repoName, repoDescription,lastUpdated, repoImage}:Props) {
    return (
      <Card className="w-96">
        <CardHeader shadow={false} floated={false} className="h-56">
          <img 
            src={repoImage} 
            className="w-full h-full object-cover"
          />
        </CardHeader>
        <CardBody>
          <div className="flex items-center justify-between mb-2">
            <Typography color="blue-gray" className="font-medium">
             {repoName}
            </Typography>
            <Typography color="blue-gray" className="font-medium">
             {lastUpdated}
            </Typography>
          </div>
          <Typography variant="small" color="gray" className="font-normal opacity-75">
            {repoDescription}
          </Typography>
        </CardBody>
        <CardFooter className="pt-0">
          <Button
            ripple={false}
            fullWidth={true}
            onClick={() => {

            }}
            className="bg-blue-gray-900/10 text-blue-gray-900 shadow-none hover:shadow-none hover:scale-105 focus:shadow-none focus:scale-105 active:scale-100"
          >
            Overview
          </Button>
        </CardFooter>
      </Card>
    );
  }
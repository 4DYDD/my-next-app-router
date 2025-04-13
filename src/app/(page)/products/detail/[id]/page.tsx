import { getData } from "@/services/getData";
import { DataType } from "@/types/datatype";
import Image from "next/image";
import React from "react";

const DetailProductPage = async ({ params }: any) => {
  const { data }: { data: DataType } = await getData(
    "http://localhost:3000/api/products?id=" + params.id
  );

  console.log("\n\n", data);
  console.log("\n\n");

  return (
    <>
      <div className="container mx-auto my-10">
        <div>
          <Image
            width={592}
            height={592}
            src={data.image}
            alt={data.name}
            className="w-full object-cover aspect-square col-span-2"
          />
        </div>
      </div>
    </>
  );
};

export default DetailProductPage;

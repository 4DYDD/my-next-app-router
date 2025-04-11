import Modal from "@/app/components/fragments/Modal";
import { getData } from "@/services/products";
import { DataType } from "@/types/datatype";
import { toIndonesiaCurrency } from "@/utils/toIndonesiaCurrency";
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
      <Modal>
        <div>
          <Image
            width={592}
            height={592}
            src={data.image}
            alt={data.name}
            className="w-full object-cover aspect-square col-span-2"
          />
          <div className="mt-3 text-lg">{data.name}</div>
          <div className="font-bold">{toIndonesiaCurrency(data.price)}</div>
        </div>
      </Modal>
    </>
  );
};

export default DetailProductPage;

import React from "react";

const FillStateInput = ({ setEditOptions, fillState }: any) => {
  const handleChangeFillState = (state: boolean) => {
    setEditOptions((prev: any) => ({ ...prev, fillState: state }));
  };

  return (
    <div className='flex flex-col gap-2'>

      <p className="text-[12px]">Fill Type</p>

      <div className="flex gap-2">
        <button
          className={`w-[30px] h-[30px] flex items-center justify-center bg-[#00000010] rounded-lg hover:bg-[#E0DFFE] ${
            !fillState && "bg-[#E0DFFE]"
          }`}
          onClick={() => {
            handleChangeFillState(false);
          }}
        >
          <div className="w-[12px] h-[12px] border-[2px] border-[black]" />
        </button>
        <button
          className={`w-[30px] h-[30px] flex items-center justify-center bg-[#00000010] rounded-lg hover:bg-[#E0DFFE] ${
            fillState && "bg-[#E0DFFE]"
          }`}
          onClick={() => {
            handleChangeFillState(true);
          }}
        >
          <div className="w-[12px] h-[12px] bg-black " />
        </button>
      </div>
    </div>
  );
};

export default FillStateInput;

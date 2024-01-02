import React from "react";
import HomeButton from "./HomeButton";
type SideProps = {
    handleClick: ()=> void
}


const Sidemenu = ({handleClick} : SideProps ) => {
  return (
    <div className="absolute z-10 flex h-full w-full flex-col gap-6 bg-green-600 opacity-90">
      <div>
        <button onClick={handleClick} className="border border-gray-400 text-white font-bold rounded-full text-xl p-5 m-5">X</button>
      </div>
      <div className="px-4 pt-5 text-right text-white">
        <h2 className="mb-5 text-right text-white text-2xl ">انضم إلى فريق الآن</h2>
        <p className="font-bold">
          اذا كانت جميع الفرق ممتلئة فلا يمكنك الاشتراك <br />
          يمكنك المحاولة في مرة قادمة
        </p>
      </div>
    </div>
  );
};

export default Sidemenu;

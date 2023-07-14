import { useContext, useEffect } from "react";
import ReviewSelectedFont from "./ReviewSelectedFont";
import { AppContext } from "contexts/AppContext";
import LinkUseOnTheWeb from "./LinkUseOnTheWeb";

const SelectedFamilyComponent = () => {
    const appContext = useContext(AppContext);
    const { selectedFamily } = appContext!;
    useEffect(() => {
    }, [selectedFamily]);
    return (
        <>
            <div className="bg-[#303134] h-full right-0 top-0">
                {selectedFamily.length > 0 ? (
                    <>
                        <div className="p-3">
                            <div className="font-medium mb-5">Review</div>
                            {selectedFamily &&
                                selectedFamily.map((item, index) => (
                                    <div key={index}>
                                        <ReviewSelectedFont selectedFont={item} />
                                    </div>
                                ))}
                        </div>
                        <div className="p-3 border-t-[0.5px] border-t-[#e8eaed] border-solid mt-3">
                            <LinkUseOnTheWeb />
                        </div>
                    </>
                ) : (
                    <div className="text-center h-full pt-[200px] ">
                        ¯\_(ツ)_/¯ <br />
                        You don’t have any fonts yet. <br />
                        Choose a style to get started.
                    </div>
                )}
            </div>
        </>
    );
};

export default SelectedFamilyComponent;

import PropTypes from "prop-types";

SubscriptionDetail.propTypes = {
    isPremium: PropTypes.bool,
    remainingActiveDays: PropTypes.number,
    activeDays: PropTypes.number,
};

export default function SubscriptionDetail({
    isPremium,
    remainingActiveDays,
    activeDays,
}) {
    return (
        <>
            {/* Basic Plan */}
            {!isPremium && (
                <div class="mt-auto pr-[30px]">
                    <div class="p-5 bg-white rounded-[25px] outline outline-1 outline-[#f1f1f1]">
                        <div class="text-black text-lg font-semibold mb-8">
                            Basic
                        </div>
                        <div class="text-black text-sm mb-2">5 of 30 hari</div>
                        <div class="rounded-full w-full h-[6px] bg-[#f1f1f1]">
                            <div class="rounded-full h-full w-2/12 bg-alerange"></div>
                        </div>
                    </div>
                </div>
            )}
            {/* End Basic Plan */}

            {/* Premium Plan */}
            {isPremium && (
                <div className="mt-auto pr-[30px]">
                    <div className="p-5 bg-black rounded-[25px]">
                        <img src="/icons/ic_star-rounded.svg" alt="" />
                        <div className="text-white text-lg font-semibold mt-4 mb-8">
                            For Greatest
                        </div>
                        <div className="text-white text-sm mb-2">
                            12 of 30 hari
                        </div>
                        <div className="rounded-full w-full h-[6px] bg-[#333333]">
                            <div className="rounded-full h-full w-9/12 bg-alerange"></div>
                        </div>
                    </div>
                </div>
            )}
            {/* End Premium Plan */}
        </>
    );
}

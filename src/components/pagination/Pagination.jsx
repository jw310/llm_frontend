import leftIcon from '@/assets/left_icon.svg';
import rightIcon from '@/assets/right_icon.svg';

const Pagination = ({ totalPages, currentPage, onClick }) => {

    return (
        <div className='flex items-center justify-center min-h-screen'>
            <div className="flex justify-center items-center space-x-4">
                <div className="flex justify-center items-center text-slate-500">
                    <span className="
                        w-[58px]
                        h-10
                        mr-2
                        flex
                        items-center
                        justify-center
                        rounded-md
                        border border-[#EDEFF1]
                        text-[#838995] text-base
                        bg-gray-100
                        hover:bg-primary hover:border-primary hover:text-black"
                        >
                        { currentPage }
                    </span>
                    <span>of { totalPages }</span>
                </div>
                <button className="
                    px-2
                    py-1
                    text-3xl
                    leading-6
                    text-slate-400
                    transition
                    border
                    rounded-md
                    bg-gray-100
                    hover:bg-gray-200
                    hover:text-slate-500
                    shadow-sm
                    cursor-pointer"
                    onClick={() => { onClick('previous') }}
                >
                    <img
                        src={leftIcon}
                        alt="leftIcon"
                        width={24}
                        height={24}
                    />
                </button>
                <button className="
                    px-2
                    py-1
                    text-3xl
                    leading-6
                    text-slate-400
                    transition
                    border rounded-md
                    bg-gray-100
                    hover:bg-gray-200
                    hover:text-slate-500
                    shadow-sm
                    cursor-pointer"
                    onClick={() => { onClick('next') }}
                >
                    <img
                        src={rightIcon}
                        alt="rightIcon"
                        width={24}
                        height={24}
                    />
                </button>
            </div>
        </div>
    );
};

export default Pagination;
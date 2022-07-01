import { useAppContext } from "../context/appContext";
import Wrapper from "../wrappers/PageBtnContainer"

import {HiChevronDoubleLeft, HiChevronDoubleRight} from "react-icons/hi"

const Pagination = () => {
    const { numOfPages, page, changePage } = useAppContext();

    const pages = Array.from({ length: numOfPages }, (_, index) => {
        return index + 1;
    })

    console.log(pages);

    const prevPage = () => {
        let newPage = page - 1;
        
        if (newPage < 1) {
            newPage = 1;
        };
        changePage(newPage);
    };

    const nextPage = () => {
        let newPage = page + 1;
        
        if (newPage > numOfPages) {
            newPage = numOfPages;
        }
        changePage(newPage);
    };
    
    return (
        <Wrapper>
            <button className="btn prev-btn" onClick={prevPage}>
                <HiChevronDoubleLeft />
                prev
            </button>

            <div className="btn-container">
                {pages.map(num=>(
                <button type="button" className={num===page?"pageBtn active":"pageBtn"} key={num} onClick={()=>changePage(num)}>{ num}</button>
                ))}
            </div>

            <button className="btn next-btn" onClick={nextPage}>
                next
                <HiChevronDoubleRight />
            </button>
        </Wrapper>
    );
};
export default Pagination;

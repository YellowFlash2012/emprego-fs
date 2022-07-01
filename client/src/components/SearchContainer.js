import { useAppContext } from "../context/appContext";
import Wrapper from "../wrappers/SearchContainer"
import FormRow from "./FormRow";
import FormRowSelect from "./FormRowSelect";

const SearchContainer = () => {
    const {
        isLoading,
        search,
        searchType,
        searchStatus,
        sort,
        sortOptions,
        newJobHandleChange,
        clearFilters,
        statusOptions,
        jobTypeOptions,
    } = useAppContext();

    const searchFieldsChange = (e) => {
        if (isLoading) {
            return;
        }

        newJobHandleChange({ name: e.target.name, value: e.target.value });
    }

    const clearFiltersHandler = () => {
        clearFilters()
    }

    return (
        <Wrapper>
            <form className="form">
                <h4>search form</h4>
                <div className="form-center">
                    <FormRow
                        type="text"
                        name="search"
                        value={search}
                        handleChange={searchFieldsChange}
                    />

                    <FormRowSelect
                        labelText="status"
                        name="searchStatus"
                        value={searchStatus}
                        handleChange={searchFieldsChange}
                        lists={["all", ...statusOptions]}
                    />

                    <FormRowSelect
                        labelText="type"
                        name="searchType"
                        value={searchType}
                        handleChange={searchFieldsChange}
                        lists={["all", ...jobTypeOptions]}
                    />

                    <FormRowSelect
                        name="sort"
                        value={sort}
                        handleChange={searchFieldsChange}
                        lists={sortOptions}
                    />

                    <button
                        type="button"
                        className="btn btn-block btn-danger"
                        onClick={clearFiltersHandler}
                    >
                        clear filters
                    </button>
                </div>
            </form>
        </Wrapper>
    );
};
export default SearchContainer;

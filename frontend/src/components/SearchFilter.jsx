const SearchFilter = ({ search, setSearch, domain, setDomain, onSearch }) => {
  return (
    <div className="search-filter glass-panel">
      <div style={{ flex: 1 }}>
        <input
          type="text"
          className="form-control"
          placeholder="Search by title or company..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div style={{ width: '200px' }}>
        <select
          className="form-control"
          value={domain}
          onChange={(e) => setDomain(e.target.value)}
        >
          <option value="All">All Domains</option>
          <option value="Software Engineering">Software Engineering</option>
          <option value="Data Science">Data Science</option>
          <option value="Product Management">Product Management</option>
          <option value="Design">Design</option>
          <option value="Marketing">Marketing</option>
        </select>
      </div>
      <button className="btn" onClick={onSearch}>Search</button>
    </div>
  );
};

export default SearchFilter;

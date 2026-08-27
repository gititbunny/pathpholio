export default function Filters({ value, onChange }) {
  const filters = ["All", "Applied", "Interview", "Offer"];

  return (
    <div className="job-filters" aria-label="Filter applications by status">
      {filters.map((filter) => (
        <button
          key={filter}
          type="button"
          className={`job-filter-button ${
            value === filter ? "active" : ""
          }`}
          onClick={() => onChange(filter)}
        >
          {filter}
        </button>
      ))}
    </div>
  );
}
export default function Filters({ value, onChange }) {
  return (
    <div
      style={{
        display: "flex",
        gap: "12px",
        alignItems: "center",
        flexWrap: "wrap",
      }}
    >
      <div>
        <label>Status Filter</label>
        <select
          className="select"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          style={{ width: "220px" }}
        >
          <option>All</option>
          <option>Applied</option>
          <option>Interview</option>
          <option>Offer</option>
        </select>
      </div>
    </div>
  );
}

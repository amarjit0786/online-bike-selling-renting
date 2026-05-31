function StatusBadge({
  status,
}) {

  const styles = {
    pending:
      "bg-yellow-100 text-yellow-700",

    approved:
      "bg-green-100 text-green-700",

    rejected:
      "bg-red-100 text-red-700",

    confirmed:
      "bg-green-100 text-green-700",

    cancelled:
      "bg-red-100 text-red-700",
  };

  return (
    <span
      className={`px-4 py-2 rounded-full text-sm font-semibold ${styles[status]}`}
    >
      {status}
    </span>
  );
}

export default StatusBadge;
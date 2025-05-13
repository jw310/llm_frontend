export function Spinner() {
  return (
    <div className="fixed inset-0 z-10 flex items-center justify-center bg-black opacity-60">
      <span className="loader"></span>
    </div>
  );
}

export function SmallSpinner() {
  return <span className="small-loader"></span>;
}

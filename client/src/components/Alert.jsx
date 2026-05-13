export default function Alert({ message, type = 'error' }) {
  if (!message) return null;

  const styles = {
    error: 'text-red-600 bg-red-50 border-red-200',
    success: 'text-green-600 bg-green-50 border-green-200',
    info: 'text-blue-600 bg-blue-50 border-blue-200',
  };

  return (
    <p className={`text-sm border rounded-lg p-3 mb-4 ${styles[type]}`}>
      {message}
    </p>
  );
}

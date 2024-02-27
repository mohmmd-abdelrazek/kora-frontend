// components/LoadingIndicator.tsx
const LoadingIndicator: React.FC = () => (
    <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
    </div>
  );
  
  export default LoadingIndicator;
  
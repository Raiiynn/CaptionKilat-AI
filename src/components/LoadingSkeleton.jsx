export default function LoadingSkeleton() {
  return (
    <div className="mt-6 space-y-4 animate-fade-in-up">
      {/* Section title skeleton */}
      <div className="flex items-center gap-2 px-1">
        <div className="w-5 h-5 rounded-md animate-shimmer" />
        <div className="w-32 h-5 rounded-lg animate-shimmer" />
      </div>

      {/* AI Analysis skeleton */}
      <div className="rounded-2xl p-4 border border-gray-100 bg-white">
        <div className="flex items-start gap-3">
          <div className="w-9 h-9 rounded-xl animate-shimmer flex-shrink-0" />
          <div className="flex-1 space-y-2">
            <div className="w-24 h-3 rounded-md animate-shimmer" />
            <div className="w-full h-3 rounded-md animate-shimmer" />
            <div className="w-3/4 h-3 rounded-md animate-shimmer" />
          </div>
        </div>
      </div>

      {/* Card skeletons */}
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className="rounded-2xl p-4 border border-gray-100 bg-white space-y-3"
          style={{ animationDelay: `${i * 0.15}s` }}
        >
          <div className="w-20 h-5 rounded-lg animate-shimmer" />
          <div className="space-y-2">
            <div className="w-full h-3 rounded-md animate-shimmer" />
            <div className="w-full h-3 rounded-md animate-shimmer" />
            <div className="w-5/6 h-3 rounded-md animate-shimmer" />
            <div className="w-2/3 h-3 rounded-md animate-shimmer" />
          </div>
          <div className="w-full h-10 rounded-xl animate-shimmer" />
        </div>
      ))}
    </div>
  );
}

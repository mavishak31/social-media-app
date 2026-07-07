export function LoadingState({ text = 'Loading...' }: { text?: string }) {
  return (
    <div className='rounded-lg border border-white/10 bg-zinc-950 p-6 text-center text-sm text-zinc-400'>
      {text}
    </div>
  );
}

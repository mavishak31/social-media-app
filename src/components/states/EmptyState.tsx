export function EmptyState({ text }: { text: string }) {
  return (
    <div className='rounded-lg border border-dashed border-white/10 bg-zinc-950 p-8 text-center text-sm text-zinc-400'>
      {text}
    </div>
  );
}

export default function Card({ url }: { url: string }) {
  return (
    <div>
      <img class="h-40 object-cover" src={url} alt="" />
    </div>
  );
}

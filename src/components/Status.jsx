function Status({ items }) {
  if (!items.length)
    return (
      <p className="stats">
        <em>Start adding some items to your packing list </em>
      </p>
    );

  const numItems = items.length;
  const packedItems = items.filter((item) => item.packed).length;
  const percents = Math.round((packedItems / numItems) * 100);

  return (
    <h2 id="list-heading" className="my-5">
      {percents === 100
        ? "You got everything! Ready to go ✈!"
        : `💼 You have ${numItems} items on your List, and You have already packed ${packedItems} (${percents}%)`}
    </h2>
  );
}
export default Status;

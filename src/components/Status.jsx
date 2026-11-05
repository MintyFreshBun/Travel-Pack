import { Luggage, PartyPopper } from "lucide-react";

function Status({ items }) {
  if (!items.length)
    return (
      <p className="notification is-info is-light status-message">
        <em>Start adding some items to your packing list </em>
      </p>
    );

  const numItems = items.length;
  const packedItems = items.filter((item) => item.packed).length;
  const percents = Math.round((packedItems / numItems) * 100);

  return (
    <h2 id="list-heading" className="subtitle is-5 status-message">
      {percents === 100 ? (
        <>
          <PartyPopper aria-hidden="true" />
          You got everything! Ready to go!
        </>
      ) : (
        <>
          <Luggage aria-hidden="true" />
          You have {numItems} items on your list, and have already packed{" "}
          {packedItems} ({percents}%)
        </>
      )}
    </h2>
  );
}
export default Status;

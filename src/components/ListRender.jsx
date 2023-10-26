import Item from "./ItemList";

function ListRender(params) {
  return (
    <ul
      role="list"
      className="todo-list stack-large stack-exception"
      aria-labelledby="list-heading"
    >
      <li className="todo stack-small">
        <div className="c-cb">
          <input id="todo-0" type="checkbox" defaultChecked={true} />
          <label className="todo-label" htmlFor="todo-0">
            Eat
          </label>
        </div>
        <div className="btn-group">
          <button type="button" className="btn">
            Edit <span className="visually-hidden">Eat</span>
          </button>
          <button type="button" className="btn btn__danger">
            Delete <span className="visually-hidden">Eat</span>
          </button>
        </div>
      </li>
      <li className="todo stack-small">
        <div className="c-cb">
          <input id="todo-1" type="checkbox" />
          <label className="todo-label" htmlFor="todo-1">
            Sleep
          </label>
        </div>
        <div className="btn-group">
          <button type="button" className="btn">
            Edit <span className="visually-hidden">Sleep</span>
          </button>
          <button type="button" className="btn btn__danger">
            Delete <span className="visually-hidden">Sleep</span>
          </button>
        </div>
      </li>
      <li className="todo stack-small">
        <div className="c-cb">
          <input id="todo-2" type="checkbox" />
          <label className="todo-label" htmlFor="todo-2">
            Repeat
          </label>
        </div>
        <div className="btn-group">
          <button type="button" className="btn">
            Edit <span className="visually-hidden">Repeat</span>
          </button>
          <button type="button" className="btn btn__danger">
            Delete <span className="visually-hidden">Repeat</span>
          </button>
        </div>
      </li>
    </ul>
  );
}
export default ListRender;

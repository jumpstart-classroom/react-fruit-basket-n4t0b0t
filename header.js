class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: null,
      fruits: []
    };
    this.url =
      "https://my-json-server.typicode.com/thoughtworks-jumpstart/api/fruits";
  }

  handleChange = event => {
    this.setState({ text: event.target.value });
  };

  async componentDidMount() {
    try {
      const response = await fetch(this.url);

      if (!response.ok) {
        throw new Error("Something bad happened!");
      }

      const fruits = await response.json();
      this.setState({ fruits });
    } catch (err) {
      console.error(err);
    }
  }

  // regular fetch version w/o using async and await:
  // componentDidMount() {
  //   fetch(this.url)
  //     .then(res => {
  //       if (!response.ok) {
  //         throw new Error("Something bad happened!");
  //       }
  //       return res.json();
  //     })
  //     .then(fruits => {
  //       this.setState(fruits);
  //     });
  // }

  render() {
    return (
      <div>
        <h1>React Fruit Basket</h1>
        <input
          type="text"
          placeholder="search for fruits here!"
          onChange={this.handleChange}
        />
        <h2>
          Currently Searching: {!this.state.text ? "..." : this.state.text}
        </h2>
        <ul>
          <FilteredList list={this.state.fruits} text={this.state.text} />
        </ul>
      </div>
    );
  }
}

function FilteredList(props) {
  let filteredArr = [];
  if (props.text) {
    filteredArr = props.list.filter(element =>
      element.type.includes(props.text)
    );
  } else {
    filteredArr = props.list;
  }
  return filteredArr.map((element, index) => (
    <li key={index}>
      {element.type} {element.emoji}
    </li>
  ));
}

const element = <Header />;
const container = document.querySelector("#app");
ReactDOM.render(element, container);

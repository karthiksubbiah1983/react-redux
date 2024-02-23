import "./table.css";

interface TableComponentProps {
  isSelect?: boolean;
  countries: string[];
  changeHandler: (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => void;
}

const TableComponent = (props: TableComponentProps) => {
  return (
    <table className="c-table">
      <thead>
        <tr>
          {props.isSelect ? <th>Check</th> : null}
          <th>Country</th>
        </tr>
      </thead>
      <tbody>
        {props.countries.map((country, index) => (
          <tr key={index}>
            {props.isSelect ? (
              <td>
                <input
                  type="checkbox"
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                    props.changeHandler(index, event)
                  }
                />
              </td>
            ) : null}

            <td>{country}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TableComponent;

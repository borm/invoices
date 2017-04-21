import React, {Component} from 'react';
import PropTypes from 'prop-types'
import Table from 'mui/lib/components/Table/Table'

class DataTable extends Component {

  static propTypes = {
    head: PropTypes.array,
    renderRow: PropTypes.func
  };

  static defaultProps = {
    head: [],
    renderRow: (item,i)=>i
  };

  constructor(props) {
    super(props);
  }

  render() {
    const { head, data } = this.props;
    const headLength = head.length;
    const dataLength = data.length;
    return (
      <Table>
        { headLength > 0 && (
          <thead>
          <tr>
            {head.map(title=><th key={title}>{title}</th>)}
          </tr>
          </thead>
        ) }
        <tbody>
        { dataLength > 0 && data.map(this.props.renderRow) }
        { dataLength > 0 || (
          <tr>
            <td colSpan={headLength}>Nothing data to view</td>
          </tr>
        ) }
        </tbody>
      </Table>
    )
  }
}

export default DataTable;
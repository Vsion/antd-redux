import React from 'react';
const GridFixed = React.createClass({
 getInitialState(){
   return { };
 },
 render() {
   return (
     <div className="grid-fixed grid-table-wraper">
        <div className="grid-head-fixed">
          <table>
            <tbody>
              <tr data-role="fixed">
                <td data-checkbox="">
                  <div className="grid-td-div grid-chk-div" style={{width: '33px'}}>
                    <span>
                      <input type="checkbox" className="g-chk-all" data-checkboxname="indexStr" />
                    </span>
                  </div>
                </td>
                <td data-sort="true" data-extkey="name" data-extfmt="true" data-number="true" data-align="center" data-name="number">
                  <div className="grid-td-div sortable" data-sortable="" style={{width: '50px'}}>
                    序号
                  </div>
                </td>
                <td data-sort="false" data-dragable="" data-name="dnByteStr" data-sourcekey="upByteStr" data-align="center">
                  <div className="grid-td-div sortable" data-sortable="" style={{width: '50px'}}>
                    数据1
                  </div>
                  <div className="grid-resize-Handler">
                  </div>
                </td>
                <td data-sort="false" data-dragable="" data-name="totalBpsStr.aa.bb.cc[1]" data-extfmt="true" data-sourcekey="upByteStr" data-align="center" data-width="70" data-fomatter="fomatterOperaCol">
                  <div className="grid-td-div sortable" data-sortable="" style={{width: '70px'}}>
                    数据a
                  </div>
                  <div className="grid-resize-Handler"></div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="grid-body-fixed" style={{height: 282}}>
          <table>
            <tbody>
              <tr data-role="fixed" className="g-row">
                <td data-checkbox="">
                  <div className="grid-td-div grid-chk-div" style={{width: 33}}>
                    <input type="checkbox" className="g-chk" />
                  </div>
                </td>
                <td data-sort="true" data-extkey="name" data-extfmt="true" data-number="true" data-align="center" data-name="number">
                <div className="grid-td-div sortable" data-sortable="" style={{width: 50}}>
                  1
                </div>
              </td>
              <td data-sort="false" data-dragable="" data-name="dnByteStr" data-sourcekey="upByteStr" data-align="center">
                <div className="grid-td-div sortable" data-sortable="" style={{width: 51}}>
                  0.5249426753725857
                </div>
              </td>
              <td data-sort="false" data-dragable="" data-name="totalBpsStr.aa.bb.cc[1]" data-extfmt="true" data-sourcekey="upByteStr" data-align="center" data-width="70" data-fomatter="fomatterOperaCol">
                <div className="grid-td-div sortable" data-sortable="" style={{width: 70}}>
                  <a href="javascript:;">
                    bb
                  </a>
                </div>
              </td>
            </tr>
            <tr data-role="fixed" className="g-row">
              <td data-checkbox="">
                <div className="grid-td-div grid-chk-div" style={{width: 33}}>
                  <input type="checkbox" className="g-chk" />
                </div>
              </td>
              <td data-sort="true" data-extkey="name" data-extfmt="true" data-number="true" data-align="center" data-name="number">
                <div className="grid-td-div sortable" data-sortable="" style={{width: 50}}>
                  2
                </div>
              </td>
              <td data-sort="false" data-dragable="" data-name="dnByteStr" data-sourcekey="upByteStr" data-align="center">
                <div className="grid-td-div sortable" data-sortable="" style={{width: 51}}>
                  0.9227021981496364
                </div>
              </td>
              <td data-sort="false" data-dragable="" data-name="totalBpsStr.aa.bb.cc[1]" data-extfmt="true" data-sourcekey="upByteStr" data-align="center" data-width="70" data-fomatter="fomatterOperaCol">
                <div className="grid-td-div sortable" data-sortable="" style={{width: 70}}>
                  <a href="javascript:;">
                    bb
                  </a>
                </div>
              </td>
            </tr>
            <tr data-role="fixed" className="g-row">
              <td data-checkbox="">
                <div className="grid-td-div grid-chk-div" style={{width: 33}}>
                  <input type="checkbox" className="g-chk" />
                </div>
              </td>
              <td data-sort="true" data-extkey="name" data-extfmt="true" data-number="true" data-align="center" data-name="number">
                <div className="grid-td-div sortable" data-sortable="" style={{width: 50}}>
                  3
                </div>
              </td>
              <td data-sort="false" data-dragable="" data-name="dnByteStr" data-sourcekey="upByteStr" data-align="center">
                <div className="grid-td-div sortable" data-sortable="" style={{width: 51}}>
                  0.6041805171407759
                </div>
              </td>
              <td data-sort="false" data-dragable="" data-name="totalBpsStr.aa.bb.cc[1]" data-extfmt="true" data-sourcekey="upByteStr" data-align="center" data-width="70" data-fomatter="fomatterOperaCol">
                <div className="grid-td-div sortable" data-sortable="" style={{width: 70}}>
                  <a href="javascript:;">
                    bb
                  </a>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="grid-ext-fixed">
        <table>
          <tbody>
            <tr data-role="fixed" className="g-row">
              <td data-checkbox="">
                <div className="grid-td-div grid-chk-div" style={{width: 33}}>
                  <input type="checkbox" className="g-chk" />
                </div>
              </td>
              <td data-sort="true" data-extkey="name" data-extfmt="true" data-number="true" data-align="center" data-name="number">
                <div className="grid-td-div sortable" data-sortable="" style={{width: 50}}>
                  -
                </div>
              </td>
              <td data-sort="false" data-dragable="" data-name="dnByteStr" data-sourcekey="upByteStr" data-align="center">
                <div className="grid-td-div sortable" data-sortable="" style={{width: 51}}>
                  0.5249426753725857
                </div>
              </td>
              <td data-sort="false" data-dragable="" data-name="totalBpsStr.aa.bb.cc[1]" data-extfmt="true" data-sourcekey="upByteStr" data-align="center" data-width="70" data-fomatter="fomatterOperaCol">
                <div className="grid-td-div sortable" data-sortable="" style={{width: 70}}>
                  <a href="javascript:;">
                    bb
                  </a>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
     </div>
   )
  }
});
module.exports = GridFixed;

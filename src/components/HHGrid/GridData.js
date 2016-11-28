import React from 'react';

const GridData = React.createClass({
 getInitialState(){
   return { };
 },
 onMouseEnterTr() {
   
 },
 onMouseLeaveTr() {

 },
 render() {
   return (
     <div className="grid-data grid-table-wraper">
       <div className="grid-head-data">
         <div className="grid-scroll-wrap">
           <table>
             <tbody>
               <tr data-role="data">
                 <td data-sort="true" data-dragable="" data-name="color" data-sourcekey="upByteStr" data-hide="true" data-align="left" data-width="80" className="grid-ele-hidden">
                   <div className="grid-td-div sortable" data-sortable="" style={{width: 80}}>
                     <a href="###">数据0</a></div>
                   <div className="grid-resize-Handler"></div>
                 </td>
                 <td data-fomatter="fmtIcon" data-width="120" data-dragable="" data-name="icon" data-align="center">
                   <div className="grid-td-div" style={{width: 120}}>灯</div>
                   <div className="grid-resize-Handler"></div>
                 </td>
                 <td data-sort="false" data-dragable="" data-name="dnMaxBpsStr" data-sourcekey="upByteStr" data-align="right" data-width="60">
                   <div className="grid-td-div sortable" data-sortable="" style={{width: 60}}>数据2</div>
                   <div className="grid-resize-Handler"></div>
                 </td>
                 <td data-sort="true" data-dragable="" data-name="dnPassByteStr" data-sourcekey="upByteStr" data-align="center" data-width="220">
                   <div className="grid-td-div sortable" data-sortable="" style={{width: 100}}>数据3</div>
                   <div className="grid-resize-Handler"></div>
                 </td>
                 <td data-sort="false" data-dragable="" data-name="dnMinBpsStr" data-sourcekey="upByteStr" data-align="center" data-width="70">
                   <div className="grid-td-div sortable" data-sortable="" style={{width: 70}}>数据3</div>
                   <div className="grid-resize-Handler"></div>
                 </td>
                 <td data-sort="false" data-dragable="" data-name="maxBpsStr" data-sourcekey="upByteStr" data-align="center" data-width="70">
                   <div className="grid-td-div sortable" data-sortable="" style={{width: 70}}>数据3</div>
                   <div className="grid-resize-Handler"></div>
                 </td>
                 <td data-sort="false" data-dragable="" data-name="minBpsStr" data-sourcekey="upByteStr" data-align="center" data-width="70">
                   <div className="grid-td-div sortable" data-sortable="" style={{width: 70}}>数据3</div>
                   <div className="grid-resize-Handler"></div>
                 </td>
                 <td data-sort="false" data-dragable="" data-name="name" data-sourcekey="upByteStr" data-align="center" data-width="70">
                   <div className="grid-td-div sortable" data-sortable="" style={{width: 70}}>数据3</div>
                   <div className="grid-resize-Handler"></div>
                 </td>
                 <td data-opera="true" data-operakey="opera0" data-align="center">
                   <div className="grid-td-div" style={{width: 50}}>操作列0</div></td>
                 <td data-opera="true" data-operakey="opera1" data-align="center">
                   <div className="grid-td-div" style={{width: 50}}>操作列1</div></td>
               </tr>
             </tbody>
           </table>
         </div>
       </div>
       <div className="grid-body-data" style={{height: 282}}>
         <div className="grid-body-scrollEle" style={{height: 282}}>
           <table>
             <tbody>
               <tr  onMouseEnter={this.onMouseEnterTr} onMouseLeave={this.onMouseLeaveTr} data-role="data" className="g-row">
                 <td data-sort="true" data-dragable="" data-name="color" data-sourcekey="upByteStr" data-hide="true" data-align="left" data-width="80" className="grid-ele-hidden">
                   <div className="grid-td-div sortable" data-sortable="" style={{width: 80}}>
                     <a href="###">C6E579</a></div>
                 </td>
                 <td data-fomatter="fmtIcon" data-width="120" data-dragable="" data-name="icon" data-align="center" data-hasqtip="0" aria-describedby="qtip-0">
                   <div className="grid-td-div" style={{width: 120}}>
                     <div style={{textAlign: 'center'}}>
                       <span className="icon-circle icon-m-r" style={{color: '#FFA500'}}></span>
                       <span className="icon-circle icon-m-r" style={{color: '#5086de'}}></span>
                     </div>
                   </div>
                 </td>
                 <td data-sort="false" data-dragable="" data-name="dnMaxBpsStr" data-sourcekey="upByteStr" data-align="right" data-width="60">
                   <div className="grid-td-div sortable" data-sortable="" style={{width: 60}}>0.021</div></td>
                 <td data-sort="true" data-dragable="" data-name="dnPassByteStr" data-sourcekey="upByteStr" data-align="center" data-width="220">
                   <div className="grid-td-div sortable" data-sortable="" style={{width: 100}}>0.5249426753725857</div></td>
                 <td data-sort="false" data-dragable="" data-name="dnMinBpsStr" data-sourcekey="upByteStr" data-align="center" data-width="70">
                   <div className="grid-td-div sortable" data-sortable="" style={{width: 70}}>0.000</div></td>
                 <td data-sort="false" data-dragable="" data-name="maxBpsStr" data-sourcekey="upByteStr" data-align="center" data-width="70">
                   <div className="grid-td-div sortable" data-sortable="" style={{width: 70}}>2.285</div></td>
                 <td data-sort="false" data-dragable="" data-name="minBpsStr" data-sourcekey="upByteStr" data-align="center" data-width="70">
                   <div className="grid-td-div sortable" data-sortable="" style={{width: 70}}>0.000</div></td>
                 <td data-sort="false" data-dragable="" data-name="name" data-sourcekey="upByteStr" data-align="center" data-width="70">
                   <div className="grid-td-div sortable" data-sortable="" style={{width: 70}}>汇总</div></td>
                 <td data-opera="true" data-operakey="opera0" data-align="center">
                   <div className="grid-td-div" style={{width: 50}}></div>
                 </td>
                 <td data-opera="true" data-operakey="opera1" data-align="center">
                   <div className="grid-td-div" style={{width: 50}}></div>
                 </td>
               </tr>
               <tr data-role="data" className="g-row">
                 <td data-sort="true" data-dragable="" data-name="color" data-sourcekey="upByteStr" data-hide="true" data-align="left" data-width="80" className="grid-ele-hidden">
                   <div className="grid-td-div sortable" data-sortable="" style={{width: 80}}>
                     <a href="###">C6E579</a></div>
                 </td>
                 <td data-fomatter="fmtIcon" data-width="120" data-dragable="" data-name="icon" data-align="center" data-hasqtip="1" aria-describedby="qtip-1">
                   <div className="grid-td-div" style={{width: 120}}>
                     <div style={{textAlign: 'center'}}>
                       <span className="icon-circle icon-m-r" style={{color: '#5086de'}}></span>
                       <span className="icon-circle icon-m-r" style={{color: '#4cc17b'}}></span>
                     </div>
                   </div>
                 </td>
                 <td data-sort="false" data-dragable="" data-name="dnMaxBpsStr" data-sourcekey="upByteStr" data-align="right" data-width="60">
                   <div className="grid-td-div sortable" data-sortable="" style={{width: 60}}>0.021</div></td>
                 <td data-sort="true" data-dragable="" data-name="dnPassByteStr" data-sourcekey="upByteStr" data-align="center" data-width="220">
                   <div className="grid-td-div sortable" data-sortable="" style={{width: 100}}>0.9227021981496364</div></td>
                 <td data-sort="false" data-dragable="" data-name="dnMinBpsStr" data-sourcekey="upByteStr" data-align="center" data-width="70">
                   <div className="grid-td-div sortable" data-sortable="" style={{width: 70}}>0.000</div></td>
                 <td data-sort="false" data-dragable="" data-name="maxBpsStr" data-sourcekey="upByteStr" data-align="center" data-width="70">
                   <div className="grid-td-div sortable" data-sortable="" style={{width: 70}}>4.236</div></td>
                 <td data-sort="false" data-dragable="" data-name="minBpsStr" data-sourcekey="upByteStr" data-align="center" data-width="70">
                   <div className="grid-td-div sortable" data-sortable="" style={{width: 70}}>0.000</div></td>
                 <td data-sort="false" data-dragable="" data-name="name" data-sourcekey="upByteStr" data-align="center" data-width="70">
                   <div className="grid-td-div sortable" data-sortable="" style={{width: 70}}>汇总</div></td>
                 <td data-opera="true" data-operakey="opera0" data-align="center">
                   <div className="grid-td-div" style={{width: 50}}></div>
                 </td>
                 <td data-opera="true" data-operakey="opera1" data-align="center">
                   <div className="grid-td-div" style={{width: 50}}></div>
                 </td>
               </tr>
               <tr data-role="data" className="g-row">
                 <td data-sort="true" data-dragable="" data-name="color" data-sourcekey="upByteStr" data-hide="true" data-align="left" data-width="80" className="grid-ele-hidden">
                   <div className="grid-td-div sortable" data-sortable="" style={{width: 80}}>
                     <a href="###">C6E579</a></div>
                 </td>
                 <td data-fomatter="fmtIcon" data-width="120" data-dragable="" data-name="icon" data-align="center" data-hasqtip="2" aria-describedby="qtip-2">
                   <div className="grid-td-div" style={{width: 120}}>
                     <div style={{textAlign: 'center'}}>
                       <span className="icon-circle icon-m-r" style={{color: '#4cc17b'}}></span>
                       <span className="icon-circle icon-m-r" style={{color: '#5086de'}}></span>
                     </div>
                   </div>
                 </td>
                 <td data-sort="false" data-dragable="" data-name="dnMaxBpsStr" data-sourcekey="upByteStr" data-align="right" data-width="60">
                   <div className="grid-td-div sortable" data-sortable="" style={{width: 60}}>0.021</div></td>
                 <td data-sort="true" data-dragable="" data-name="dnPassByteStr" data-sourcekey="upByteStr" data-align="center" data-width="220">
                   <div className="grid-td-div sortable" data-sortable="" style={{width: 100}}>0.6041805171407759</div></td>
                 <td data-sort="false" data-dragable="" data-name="dnMinBpsStr" data-sourcekey="upByteStr" data-align="center" data-width="70">
                   <div className="grid-td-div sortable" data-sortable="" style={{width: 70}}>0.000</div></td>
                 <td data-sort="false" data-dragable="" data-name="maxBpsStr" data-sourcekey="upByteStr" data-align="center" data-width="70">
                   <div className="grid-td-div sortable" data-sortable="" style={{width: 70}}>0.96148</div></td>
                 <td data-sort="false" data-dragable="" data-name="minBpsStr" data-sourcekey="upByteStr" data-align="center" data-width="70">
                   <div className="grid-td-div sortable" data-sortable="" style={{width: 70}}>0.000</div></td>
                 <td data-sort="false" data-dragable="" data-name="name" data-sourcekey="upByteStr" data-align="center" data-width="70">
                   <div className="grid-td-div sortable" data-sortable="" style={{width: 70}}>汇总</div></td>
                 <td data-opera="true" data-operakey="opera0" data-align="center">
                   <div className="grid-td-div" style={{width: 50}}></div>
                 </td>
                 <td data-opera="true" data-operakey="opera1" data-align="center">
                   <div className="grid-td-div" style={{width: 50}}></div>
                 </td>
               </tr>
             </tbody>
           </table>
         </div>
         <div className="grid-handle-x" style={{display: 'none', width: 1158}}></div>
         <div className="grid-handle-y" style={{height: 50, top: 0}}></div>
       </div>
       <div className="grid-ext-data">
         <div className="grid-scroll-wrap">
           <table>
             <tbody>
               <tr data-role="data" className="g-row">
                 <td data-sort="true" data-dragable="" data-name="color" data-sourcekey="upByteStr" data-hide="true" data-align="left" data-width="80" className="grid-ele-hidden">
                   <div className="grid-td-div sortable" data-sortable="" style={{width: 80}}>
                     <a href="###">C6E579</a></div>
                 </td>
                 <td data-fomatter="fmtIcon" data-width="120" data-dragable="" data-name="icon" data-align="center" data-hasqtip="50">
                   <div className="grid-td-div" style={{width: 120}}>
                     <div style={{textAlign: 'center'}}>
                       <span className="icon-circle icon-m-r" style={{color: '#FFA500'}}></span>
                       <span className="icon-circle icon-m-r" style={{color: '#5086de'}}></span>
                     </div>
                   </div>
                 </td>
                 <td data-sort="false" data-dragable="" data-name="dnMaxBpsStr" data-sourcekey="upByteStr" data-align="right" data-width="60">
                   <div className="grid-td-div sortable" data-sortable="" style={{width: 60}}>0.021</div></td>
                 <td data-sort="true" data-dragable="" data-name="dnPassByteStr" data-sourcekey="upByteStr" data-align="center" data-width="220">
                   <div className="grid-td-div sortable" data-sortable="" style={{width: 100}}>0.5249426753725857</div></td>
                 <td data-sort="false" data-dragable="" data-name="dnMinBpsStr" data-sourcekey="upByteStr" data-align="center" data-width="70">
                   <div className="grid-td-div sortable" data-sortable="" style={{width: 70}}>0.000</div></td>
                 <td data-sort="false" data-dragable="" data-name="maxBpsStr" data-sourcekey="upByteStr" data-align="center" data-width="70">
                   <div className="grid-td-div sortable" data-sortable="" style={{width: 70}}>2.285</div></td>
                 <td data-sort="false" data-dragable="" data-name="minBpsStr" data-sourcekey="upByteStr" data-align="center" data-width="70">
                   <div className="grid-td-div sortable" data-sortable="" style={{width: 70}}>0.000</div></td>
                 <td data-sort="false" data-dragable="" data-name="name" data-sourcekey="upByteStr" data-align="center" data-width="70">
                   <div className="grid-td-div sortable" data-sortable="" style={{width: 70}}>汇总</div></td>
                 <td data-opera="true" data-operakey="opera0" data-align="center">
                   <div className="grid-td-div" style={{width: 50}}></div>
                 </td>
                 <td data-opera="true" data-operakey="opera1" data-align="center">
                   <div className="grid-td-div" style={{width: 50}}></div>
                 </td>
               </tr>
             </tbody>
           </table>
         </div>
       </div>
     </div>
   )
  }
});
module.exports = GridData;

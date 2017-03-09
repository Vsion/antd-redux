
export const toggleMenu = (state) => {
  return {
    type: 'TOGGLE_MENU',
    state
  }
}
export const setOpenKeys = (state) => {
  return {
    type: 'SET_OPENKEYS',
    state
  }
}
export const setActiveKey = (state) => {
  return {
    type: 'SET_ACTIVEKEY',
    state
  }
}
export const changeActiveKey = (state) => {
  return {
    type: 'CHANGE_ACTIVEKEY',
    state
  }
}
export const removeTab = (state) => {
  return {
    type: 'REMOVE_TAB',
    state
  }
}

export const selectNode = (state) => {
  return {
    type: 'SELECT_NODE',
    state
  }
}

export const getMenu = () => {
  return async (dispatch) => {
    let msg = await fetch('data/nodes',{
      method: 'POST',
      //body: JSON.stringify({"aa":"aa"}),
      header: {'content-type':'application/json; charset=utf-8'}
    }).then((res)=>res.json());
    var state = { nodes: msg };
    dispatch({
      type: 'INIT',
      state
    });
    // state = { openKeys: ["sub3","sub3_1"] };
    // dispatch({
    //   type: 'SET_OPENKEYS',
    //   state
    // });
  };
}

export const setBreadCrumb = (state) => {
  return {
    type: 'SET_BREADCRUMB',
    state
  }
}

export const deepLinkTo = (state) => {
  return {
    type: 'DEEP_LINKTO',
    state
  }
}

export const logOut = (state) => {
  return {
    type: 'LOG_OUT',
    state
  }
}
export const infoMessage = (state) => {
  return {
    type: 'INFO_MESSAGE',
    state
  }
}

export const openNotification = (state) => {
  return {
    type: 'OPEN_NOTIFICATION',
    state
  }
}

export const openNotificationNoClose = (state) => {
  return {
    type: 'OPEN_NOTIFICATIONNOCLOSE',
    state
  }
}

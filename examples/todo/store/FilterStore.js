import {Store} from '../../../src/eflow';
class FilterStore extends Store{
  constructor(options){
    super(options);
    this.count = 0;
    this.initState({
      filter: 'All'
    });
  }

  showAll(){
    this.filter('All');
  }

  showActive(){
    this.filter('Active');
  }

  showCompleted(){
    this.filter('Completed');
  }

  filter(filter){
    var dispatch = this.filter.dispatch;
    dispatch(filter);
  }

}

export default new FilterStore();
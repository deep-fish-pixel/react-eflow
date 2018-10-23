import {Store} from '../../../src/eflow';
class FilterStore extends Store{
  constructor(options){
    super(options);
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
let filterStore2 = new FilterStore('filterStore2');
export {
  filterStore2
};
export default new FilterStore();
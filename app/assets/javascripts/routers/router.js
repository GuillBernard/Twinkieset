TwinkieSetApp.Routers.Router = Backbone.Router.extend({
  routes: {
    "": "index",
    "collection/:id": "show"
  },

  initialize: function (options) {
    console.log("got into router");
    this.$rootEl = options.$rootEl;
    this.collection = new TwinkieSetApp.Collections.Albums();
  },

  index: function () {
    this.collection.fetch();
    var indexView = new TwinkieSetApp.Views.AlbumsIndex({ collection: this.collection });
    this._swapView(indexView);
    console.log("in the index route");
  },

  show: function (id) {
    var album = this.collection.getOrFetch(id);
    var showView = new TwinkieSetApp.Views.AlbumsShow({ model: album });
    this._swapView(showView);
    console.log("in the show route");
  },

  _swapView: function (newView) {
    this._currentView && this._currentView.remove();
    this._currentView = newView;
    this.$rootEl.html(newView.render().$el);
  }
});
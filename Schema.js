var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost/ipcluster');

var ClientSchema = new Schema({
  ip: {type: String, default: null},
  _ticket: {type: Schema.ObjectId, ref: 'Ticket'}
});

var TicketSchema = new Schema({
  title: {type: String, default: null},
  description: {type: String, default: null},
  clients: [{type: Schema.ObjectId, ref: 'Client'}],
  status: {type: Number, default: 0}
});

mongoose.model('Client', ClientSchema);
mongoose.model('Ticket', TicketSchema);

module.exports.Client = mongoose.model('Client');
module.exports.Ticket = mongoose.model('Ticket');


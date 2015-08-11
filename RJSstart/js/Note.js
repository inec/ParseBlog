var Note = React.createClass({
	getInitialState:function(){
return {editing:false}
	},
edit: function(){
this.setState({editing: true});
},
save: function(){
	this.setState({editing: false});
},
remove: function(){
alert('remove');
},
renderDisplay:function(){
        return(
        	<div className="note">
        	<p>{this.props.children}</p>
<span>
<button onClick={this.edit} className="btn btn-primary glyphicon glyphicon-pencil"/>
<button onClick={this.remove} className="btn btn-danger glyphicon glyphicon-trash"/>
</span>
        	</div>
        	);
},
renderForm:function(){
return(
	<div className="note">
<textarea defaultValue={this.props.childred} className="form-control"></textarea>
	<button onClick={this.save} className="btn btn-sucess btn-sm glyphicon glyphicon-floopy-disk" />
	</div>
	)
},
    render: function() {
if (this.state.editing)
	{return this.renderForm()}
else
{
	return this.renderDisplay();
}
}
});
React.render(<Note>Hello World</Note>, 
    document.getElementById('react-container'));
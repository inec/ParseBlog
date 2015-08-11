var HelloWorld=React.createClass({
    	render:function(){
    		return (
    			<div>
    			<h1>hello jsx</h1>
    			<p>test jsx</p>
    			</div>
    			);
    	}
    });
React.render(<HelloWorld />, document.body)
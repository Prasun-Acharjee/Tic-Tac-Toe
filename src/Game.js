import React,{Component} from 'react'
import io from 'socket.io-client'
class Game extends Component{
    constructor(props){
        super(props)
        this.state={a:Array(9).fill('-'),player:this.props.p1,condition:true}
        this.socket=io('localhost:4001',{query:`username=${props.name}`})
        this.socket.on('server:message',messageObj=>{this.addMessage(messageObj)})
    }
    click=(i,j)=>{
        const temp=this.state.a;
        console.log(this.props.p1+','+this.props.p2
        )
        if(this.state.condition){
            temp.splice(i*3+j,1,'x')
            this.setState({a:temp,player:this.props.p2,condition:false},()=>{
                this.check('x',this.props.p1);
            })
        }
        else{
            temp.splice(i*3+j,1,'o')
            this.setState({a:temp,player:this.props.p1,condition:true},()=>{
                this.check('o',this.props.p2)
            })
        }
    }
    check=(ch,p)=>{
        var f=true;
        console.log(this.state.a)
        for(var i=1,j=3,k=4;i<=7,j<=5;i+=3,j++){
            if(this.state.a[i-1]===ch && this.state.a[i]===ch && this.state.a[i+1]===ch)
            alert(p+" WON");
            if(this.state.a[j-3]===ch && this.state.a[j]===ch && this.state.a[j+3]===ch)
            alert(p+" WON");
            if((this.state.a[k-2]===ch && this.state.a[k]===ch && this.state.a[k+2]===ch) || 
                (this.state.a[k-4]===ch && this.state.a[k]===ch && this.state.a[k+4]===ch))
                alert(p+" WON");

        }
        for(i=0;i<9;i++)
        if(this.state.a[i]==='-')
        f=false;
        if(f)
        alert('DRAW')
    }
    render(){
        return(
            <div>
                <p>{this.state.player}'s turn</p>
                {
                    Array(3).fill(null).map(
                        (item,i)=><p>{
                            Array(3).fill(null).map(
                            (item,j)=><button onClick={()=>this.click(i,j)}>{this.state.a[i*3+j]}</button>
                        )
                        }</p>
                        
                    )
                }
            </div>
        )
    }
}
export default Game;
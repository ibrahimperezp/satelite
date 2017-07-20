<?php
class MySql
{
    //Atributos   
    protected $connect;

    //Funcion Constructora
    protected function __construct($server,$user,$password,$dataBase)
   	{
        $this->connect=mysqli_connect($server,$user,$password,$dataBase);
    }


    //Funcion que se desconecta a la base de datos
    protected function disconnect()
    {		
        //mysqli_close($this->conectar);		
    }


    //Funcion que ejecuta una instruccion en sql
    protected function execute($codigo)
    {
        mysqli_query($this->connect,$codigo);
        $this->disconnect();		
    }
	
	//Funcion que ejecuta una instruccion en sql y retorna el campo auto-generado
	protected function executeAndReturn($codigo)
	{
		mysqli_query($this->connect,$codigo);
		$last_id = mysqli_insert_id($this->connect);
		$this->disconnect();
		return $last_id;
	}

    //Funcion que busca si existe un registro en la base de datos
    protected function check($query)
    {
		$q=mysqli_query($this->connect,$query);
        if(mysqli_fetch_assoc($q)){return true;}			
        else{return false;}
        $this->disconnect();
    }

    //Funcion que retorna el/los valor/es de un/os registro/s en la base de datos en forma de arreglo
    protected  function getArranged($codigo)
    {
        $contador=0;
        $arreglo[0]="";
        $query=mysqli_query($this->connect,$codigo);
        while($resultado=mysqli_fetch_assoc($query))
        {
            ++$contador;
            $arreglo[$contador]=$resultado;
        }
        $arreglo[0]=$contador;	
        $this->disconnect();
        return $arreglo;
    }
	
	 
   //Funcion que retorna el/los valor/es de un/os registro/s en la base de datos
    protected function getRaw($codigo)
    {
        $arreglo=array();
        $query=mysqli_query($this->connect,$codigo);
        while($resultado=mysqli_fetch_assoc($query))
        {
        	array_push($arreglo,$resultado);
        }
        $this->disconnect();
        return $arreglo;
    }
    
   /* 
	protected function retornar_id($codigo)
	{
		 mysqli_query($this->conectar,$codigo);
		 $last_id = mysqli_insert_id($this->conectar);
		 $this->desconectar();
		 return $last_id;
	}
   
  
    
    //Funcion que retorna el/los valor/es de un/os registro/s en la base de datos
    protected function retornar_simple($codigo)
    {
        $query=mysqli_query($this->conectar,$codigo);
        $resultado=mysqli_fetch_assoc($query);
        $this->desconectar();
        return $resultado;
    }
	*/
	
}

?>
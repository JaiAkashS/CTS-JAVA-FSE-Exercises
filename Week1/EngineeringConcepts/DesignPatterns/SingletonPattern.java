class SingletonPattern{
    private static SingletonPattern instance;
    private SingletonPattern(){

    }
    private static SingletonPattern getInstance(){
        if(instance==null){
            instance = new SingletonPattern();
        }
        return instance;
    }
}

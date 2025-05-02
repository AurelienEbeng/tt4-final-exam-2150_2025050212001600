namespace backend.Models {
    public class Bug{
        public int ID {get; set;}
        public string Title{get; set;}
        public string Description {get; set;}
        public String Priority {get; set;}
        public bool IsResolved{get; set;} = false;
    }
}
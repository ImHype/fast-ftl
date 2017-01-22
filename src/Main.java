import com.june.fastftl.Render;
import com.june.fastftl.Server;

/**
 * Created by june on 2017/1/22.
 */
public class Main {
    public static void main (String[] args) {
        Render render = new Render("/Users/june/Desktop/Projects/kaola/haitaowap/src/main/webapp/WEB-INF/template");

        Server server = new Server(Integer.valueOf((args[0] != null) ? args[0]: "3333"), render);

    }
}

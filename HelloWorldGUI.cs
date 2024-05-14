using System;
using System.Windows.Forms;
using System.Drawing;

namespace program{
    class program{
        private static void Main(){
            Form mainForm = new Form();
            Label lblFirst = new Label();
            mainForm.Width = 300;
            mainForm.Height = 400; 
            lblFirst.Text = "Hello World";
            lblFirst.Location = new Point(150,200);
            mainForm.Controls.Add(lblFirst);
            Application.Run(mainForm);
        }   
    }
}


/* 
    configure live server/html previewer
    ---extensions---
    >Live Server
    >Live Server Preview
    >Live HTML Previewer
    >Browser Preview
    ---settings--
    > settings icon
    > search : live server
    > live server: settings: use browser preview (True/Tick) : [Enables Browser Preview To Open Automatically Without Going To Browser]
    ---
*/


import base64
import datetime
import io
import plotly.graph_objs as go
import cufflinks as cf
import plotly.express as px

import dash
from dash.dependencies import Input, Output, State
# import dash_core_components as dcc
# import dash_html_components as html
# import dash_table

from dash import dcc
from dash import dash_table
from dash import html

import pandas as pd

external_stylesheets = ["https://codepen.io/chriddyp/pen/bWLwgP.css"]

app = dash.Dash(__name__, external_stylesheets=external_stylesheets)
server = app.server

colors = {"graphBackground": "#F5F5F5", "background": "#ffffff", "text": "#000000"}

app.layout = html.Div(
    [
        dcc.Upload(
            id="upload-data",
            children=html.Div(["Drag and Drop or ", html.A("Select Files")]),
            style={
                "width": "100%",
                "height": "60px",
                "lineHeight": "60px",
                "borderWidth": "1px",
                "borderStyle": "dashed",
                "borderRadius": "5px",
                "textAlign": "center",
                "margin": "10px",
            },
            # Allow multiple files to be uploaded
            multiple=True,
        ),
        dcc.Dropdown(id='x-axis', placeholder="X-Axis"),
        # html.Button('Add X-Axis Columns', id='add_x_axis_columns', n_clicks=0),
        dcc.Dropdown(id='y-axis', placeholder="Y-Axis"),
        # html.Button('Add Y-Axis Columns', id='add_y_axis_columns', n_clicks=0),
        dcc.Dropdown(id='color', placeholder="Color"),
        dcc.Graph(id="Mygraph"),
        html.Div(id="output-data-upload"),
    ]
)

# @app.callback(
#     Output('x-axis', 'options'),
#     columns)
# def update(n_clicks, existing_options):
#     print("Flag Updated")
#     return []

# @app.callback(
#     Output('x-axis', 'options'),
#     [Input('add_x_axis_columns', 'n_clicks')],
#     [State('x-axis', 'options')])
# def update_options(n_clicks, existing_options):
#     new_options = []
#     for choice in columns:
#         new_options.append({'label': choice, 'value': choice})
#     return new_options


# @app.callback(
#     Output('y-axis', 'options'),
#     [Input('add_y_axis_columns', 'n_clicks')],
#     [State('y-axis', 'options')])
# def update_options(n_clicks, existing_options):
#     new_options = []
#     for choice in columns:
#         new_options.append({'label': choice, 'value': choice})
#     return new_options

@app.callback(
    Output('y-axis', 'options'),
    [Input("upload-data", "contents"), 
    Input("upload-data", "filename")],
    [State('y-axis', 'options')])
def update_y_columns(contents, filename, exsting_options):
    new_options = []
    if contents:
        contents = contents[0]
        filename = filename[0]
        df = parse_data(contents, filename)
        arr = df.columns
        for choice in arr:
            new_options.append({'label': choice, 'value': choice})
    return new_options

@app.callback(
    Output('color', 'options'),
    [Input("upload-data", "contents"), 
    Input("upload-data", "filename")],
    [State('color', 'options')])
def update_y_columns(contents, filename, exsting_options):
    new_options = []
    if contents:
        contents = contents[0]
        filename = filename[0]
        df = parse_data(contents, filename)
        arr = df.columns
        for choice in arr:
            new_options.append({'label': choice, 'value': choice})
    return new_options

@app.callback(
    Output('x-axis', 'options'),
    [Input("upload-data", "contents"), 
    Input("upload-data", "filename")],
    [State('x-axis', 'options')])
def update_x_columns(contents, filename, exsting_options):
    new_options = []
    if contents:
        contents = contents[0]
        filename = filename[0]
        df = parse_data(contents, filename)
        arr = df.columns
        for choice in arr:
            new_options.append({'label': choice, 'value': choice})
    return new_options

@app.callback(
    Output("Mygraph", "figure"),
    [Input("upload-data", "contents"), 
    Input("upload-data", "filename"),
    dash.dependencies.Input('y-axis', 'value'),
    dash.dependencies.Input('x-axis', 'value'),    
    dash.dependencies.Input('color', 'value')],
)
def update_graph(contents, filename, xaxis, yaxis, color):
    fig = {
        "layout": go.Layout(
            plot_bgcolor=colors["graphBackground"],
            paper_bgcolor=colors["graphBackground"],
        )
    }
    if contents:
        contents = contents[0]
        filename = filename[0]
        df = parse_data(contents, filename)

        # print("Called" + " X-axis: " + str(xaxis) + "Y-Axis: " + str(yaxis))
        if xaxis != None and yaxis != None:
            if color != None:
                fig = px.scatter(df, x=xaxis, y=yaxis, color=color)
            else:
                fig = px.scatter(df, x=xaxis, y=yaxis)                
    return fig

    # if contents:
    #     contents = contents[0]
    #     filename = filename[0]
    #     df = parse_data(contents, filename)
    #     df = df.set_index(df.columns[0])
    #     fig["data"] = df.iplot(
    #         asFigure=True, kind="scatter", mode="lines+markers", size=1
    #     )

    # return fig


def parse_data(contents, filename):
    content_type, content_string = contents.split(",")

    decoded = base64.b64decode(content_string)
    try:
        if "csv" in filename:
            # Assume that the user uploaded a CSV or TXT file
            df = pd.read_csv(io.StringIO(decoded.decode("utf-8")))
        elif "xls" in filename:
            # Assume that the user uploaded an excel file
            df = pd.read_excel(io.BytesIO(decoded))
        elif "txt" or "tsv" in filename:
            # Assume that the user upl, delimiter = r'\s+'oaded an excel file
            df = pd.read_csv(io.StringIO(decoded.decode("utf-8")), delimiter=r"\s+")
    except Exception as e:
        print(e)
        return html.Div(["There was an error processing this file."])

    return df


@app.callback(
    Output("output-data-upload", "children"),
    [Input("upload-data", "contents"), Input("upload-data", "filename")],
)
def update_table(contents, filename):
    table = html.Div()

    if contents:
        contents = contents[0]
        filename = filename[0]
        df = parse_data(contents, filename)

        table = html.Div(
            [
                html.H5(filename),
                dash_table.DataTable(
                    data=df.to_dict("rows"),
                    columns=[{"name": i, "id": i} for i in df.columns],
                ),
                html.Hr(),
                html.Div("Raw Content"),
                html.Pre(
                    contents[0:200] + "...",
                    style={"whiteSpace": "pre-wrap", "wordBreak": "break-all"},
                ),
            ]
        )

    return table


if __name__ == "__main__":
    app.run_server(debug=True)
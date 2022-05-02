from flask import Flask, render_template, jsonify, request
from flask_basicauth import BasicAuth
from flask_mail import Mail, Message
from neo4j import GraphDatabase, WRITE_ACCESS, basic_auth
import json
app = Flask(__name__)

#login info
app.config['BASIC_AUTH_USERNAME'] = 'urizen'
app.config['BASIC_AUTH_PASSWORD'] = 'Amos'
fbasic_auth = BasicAuth(app)

#Connects to gmail server for website email
app.config.update(dict(
    MAIL_SERVER = 'smtp.googlemail.com',
    MAIL_PORT = 465,
    MAIL_USE_TLS = False,
    MAIL_USE_SSL = True,
    MAIL_USERNAME='LitRhizome@gmail.com',
    MAIL_PASSWORD='RhizomeRhizome123'
))
mail = Mail(app)

#Function to send email to self with form content
@app.route('/process_email', methods=['POST'])
def process_email():
    #Sends email from the moderator email to itself so mods can view it
    contents = request.form['message']
    msg = Message('Test', sender='LitRhizome@gmail.com', recipients=['LitRhizome@gmail.com'])
    msg.body = str(contents)#Customize based on user input
    mail.send(msg)
    return render_template('aftermessage.html')



@app.route('/AddItemFunc', methods=['POST'])
#Function to query the database to add the specified item
def AddItemFunc():
    print("starting additem")
    mytype = request.form['type']
    print(mytype)
    name = request.form['name']
    print(name)
    released = request.form['released']
    author = request.form['Author']
    genre = request.form['Genre']
    q = '''CREATE ({0}:{1} {{type: \"{2}\", id: 100,name:\'{3}\', image: \'https://htmlcolorcodes.com/assets/images/colors/blood-red-color-solid-background-1920x1080.png\'}})'''.format(str(name), str(mytype), str(mytype), str(name))
    AddItemToDB(q)
    return render_template('aftermessage.html')

def makeQuery(q):
    print("query:", q)
    #Performs a query to the Neo4j database and returns the results
    #from https://github.com/neo4j-graph-examples/stackoverflow/blob/main/code/python/example.py
    driver = GraphDatabase.driver(
      "bolt://34.200.240.166:7687",
      auth=basic_auth("neo4j", "science-vicinity-participations"))
    cypher_query = q
    with driver.session(database="neo4j") as session:
      results = session.read_transaction(
        lambda tx: tx.run(cypher_query).data())
    driver.close()
    return results

def AddItemToDB(query):
    #Connection to the database for the query
    driver = GraphDatabase.driver(
        "bolt://34.200.240.166:7687",
        auth=basic_auth("neo4j", "science-vicinity-participations"))
    session = driver.session(default_access_mode=WRITE_ACCESS)
    session.run(query)
    session.close()
    driver.close()

@app.route('/Searcher', methods = ['POST'])
def search():
    if request.method == 'POST':
        #This takes a search terms as an argument, queries the database for any titles that contain it, and returns a JSON of the results
        searchterms = request.args.get('searchterms')
        print("Request.form: {0}".format(request.form))
        print(searchterms)
        q = makeQuery('''
                    MATCH (n)
                    WHERE n.name CONTAINS "{0}"
                    RETURN n
                    '''.format(str(searchterms)))
        nodes = [(record['n']) for record in q]
        print(nodes)
        return jsonify(nodes)
        # Failure to return a redirect or render_template
    else:
        return render_template('graph.html')


@app.route('/WideSearcher', methods=['POST'])
def widesearch():
        if request.method == 'POST':
            # This takes a search terms as an argument, queries the database for any titles that contain it, and returns a JSON of the results
            searchterms = request.args.get('searchterms')
            radius = int(request.args.get('radius'))
            nodes = RadiusMaker(radius, searchterms)
            return jsonify(nodes)
        else:
            return render_template('graph.html')

def RadiusMaker(radius, searchterms):
    u = makeQuery('''
                    MATCH (n)
                    WHERE n.name CONTAINS "{0}"
                    RETURN n
                    '''.format(str(searchterms)))
    results = [(record['n']) for record in u]
    curq = '''(n)'''
    num = -1
    for i in range(radius):
        curstr = str('''-[l{0}:REL]-(n{0})'''.format(str(i)))
        curq += curstr
        num += 1
        curresults = makeQuery('''
            MATCH {0}
            WHERE n.name CONTAINS "{1}"
            RETURN n{2}'''.format(str(curq), str(searchterms), str(num)))
        results += [(record['n{0}'.format(str(num))]) for record in curresults]

    return results


@app.route('/Filter', methods = ['POST'])
def filter():
    if request.method == 'POST':
        filterterm = request.args.get('filterterm')
        print("Request.form: {0}".format(request.form))
        print(filterterm)
        q = makeQuery('''
                    MATCH (n:{0})
                    RETURN n
                    '''.format(str(filterterm)))
        nodes = [(record['n']) for record in q]
        print(nodes)
        return jsonify(nodes)
        # Failure to return a redirect or render_template
    else:
        return render_template('graph.html')


@app.route('/')
def main():
    """HOME"""
    results = makeQuery('''
        MATCH (n)
        RETURN n
        ''')
    nodes = [(record['n']) for record in results]
    edges = makeQuery('''
                        Match (n)-[r:REL]->(n2) 
                        RETURN r.start, r.end, r.nature, r.colour
                        ''')

    return render_template('graph.html',
                           nodes=nodes,
                           edges=edges
                           )


@app.route('/Suggestions')
def Suggestions():
    return render_template('suggestions.html')

@app.route('/AddItem')
@fbasic_auth.required
def AddItem():
    return render_template('AddItem.html')

@app.route('/text/<string:text_name>')
def text(text_name):
    #function for rendering individual text page
    q = '''
    MATCH (n:Text {name: "%s"})
    RETURN n
    ''' % (str(text_name))
    fullrecord = makeQuery(q)
    text_record = [(record['n']) for record in fullrecord]
    q2 = '''
    MATCH (n)<-[r:REL]-(w:Author)-[r1:REL]->(n3)
    WHERE n.name= "%s" AND r1.nature = 'Author Of' AND r.nature = "Author Of" 
    RETURN w, n3
    ''' % (str(text_name))
    SameAuthor = makeQuery(q2)
    Author_record = SameAuthor[0]['w']
    print(SameAuthor)
    SAuthor_record = [(Srecord['n3']) for Srecord in SameAuthor]
    print(Author_record)
    print(text_record)
    print(SAuthor_record)
    return render_template('text.html',
                           text_name=text_name,
                           text_record=text_record,
                           Author_record=Author_record,
                           SAuthor_record=SAuthor_record)


@app.route('/author/<string:writer_name>')
def writer(writer_name):
    #function for rendering individual writer page
    q = '''
    MATCH (n:Author {name: "%s"})
    RETURN n
    ''' % (str(writer_name))
    writer_record = makeQuery(q)
    print(writer_record)
    return render_template('writer.html', writer_name=writer_name, writer_record=writer_record)


@app.route('/genre/<string:genre_name>')
def genres(genre_name):
    #function for rendering individual genre page
    q = '''
    MATCH (n:Genre {name: '%s'})
    RETURN n
    ''' % (str(genre_name))
    genre_record = makeQuery(q)
    print(genre_record)
    return render_template('genre.html', genre_name=genre_name, genre_record=genre_record)

if __name__ == '__main__':
    app.run(debug=True, use_debugger=False, use_reloader=False, passthrough_errors=True)

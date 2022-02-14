from flask import Flask, render_template, jsonify, request
from neo4j import GraphDatabase, basic_auth
import json
app = Flask(__name__)


def makeQuery(q):
    #Performs a query to the Neo4j database and returns the results
    driver = GraphDatabase.driver(
      "bolt://18.207.179.12:7687",
      auth=basic_auth("neo4j", "backups-corks-hazard"))
    cypher_query = q
    with driver.session(database="neo4j") as session:
      results = session.read_transaction(
        lambda tx: tx.run(cypher_query).data())
    driver.close()
    return results

@app.route('/Searcher', methods = ['POST'])
def search():
    if request.method == 'POST':
        #This takes a search terms as an argument, queries the database for any titles that contain it, and returns a JSON of the results
        searchterms = request.args.get('searchterms')
        print("Request.form: {0}".format(request.form))
        #print("Request: {0}".format(request.form.get('body')))
        #req = request.form['searchterms']
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



@app.route('/text/<string:text_name>')
def text(text_name):
    #function for rendering individual text page
    q = '''
    MATCH (n:Text {name: "%s"})
    RETURN n
    ''' % (str(text_name))
    text_record = makeQuery(q)
    print(text_record)
    return render_template('text.html', text_name=text_name, text_record=text_record)


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
